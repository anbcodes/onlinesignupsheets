export default class Sheet {
  constructor(name) {
    this.name = name;
    this.staged = [];
    this.load();
  }

  async load() {
    this.sheetId = await this.loadSheet();
    await this.get();
    await this.setUp();
    await this.write();
    // this.getOverview();
    // this.getAccount();
  }

  async loadSheet() {
    if (localStorage.getItem(this.name)) {
      return localStorage.getItem(this.name);
    }
    let sheetId = await this.getExistingSheet();
    if (!sheetId) {
      const response = await window.gapi.client.sheets.spreadsheets.create({
        properties: {
          title: this.name,
        },
      });
      sheetId = response.result.spreadsheetId;
    }

    localStorage.setItem(`Sheet-${this.name}`, sheetId);
    return sheetId;
  }

  async getExistingSheet() {
    const res = (await window.gapi.client.drive.files.list({
      q: `name = '${this.name}' and trashed = false`,
      fields: 'files(id, name)',
      spaces: 'drive',
    })).result;
    console.log('RES', res.files);
    return (res.files && res.files[0]) ? res.files[0].id : undefined;
  }

  async get() {
    this.sheet = await this.getSheet();
  }

  async getSheet() {
    if (!this.sheetId) throw new Error('Tried to get sheet before loaded');
    const response = await window.gapi.client.sheets.spreadsheets.get({
      spreadsheetId: this.sheetId,
    });

    return response.result;
  }

  async setUp() {
    if (!this.sheet.sheets.map(s => s.properties.title).includes('___Account___')) {
      this.createAccountSheet();
    }
    if (!this.sheet.sheets.map(s => s.properties.title).includes('___Overview___')) {
      this.createOverviewSheet();
    }
  }

  createAccountSheet() {
    this.staged.push({
      type: 'addSheet',
      data: {
        title: '___Account___',
      },
    });

    this.staged.push({
      type: 'cellUpdate',
      data: {
        range: '\'___Account___\'!A1:D1',
        values: [
          ['Owner Key', 'Your Key', 'Sheet Name', 'Your name'],
        ],
      },
    });
  }

  createOverviewSheet() {
    this.staged.push({
      type: 'addSheet',
      data: {
        title: '___Overview___',
      },
    });

    this.staged.push({
      type: 'cellUpdate',
      data: {
        range: '\'___Overview___\'!A1:C1',
        values: [
          ['Key', 'Name', 'Sheet Id'],
        ],
      },
    });
  }


  async write() {
    const sheetData = {
      spreadsheetId: this.sheetId,
      requests: [],
    };

    const updateData = {
      spreadsheetId: this.sheetId,
      valueInputOption: 'USER_ENTERED',
      data: [],
    };

    this.staged.forEach((write) => {
      const sheetRequest = {};
      const updateRequest = {};
      switch (write.type) {
        case 'addSheet':
          sheetRequest.addSheet = {};
          sheetRequest.addSheet.properties = {
            title: write.data.title,
          };
          break;
        case 'cellUpdate':
          updateRequest.range = write.data.range;
          updateRequest.values = write.data.values;
          break;
      }
      if (Object.keys(sheetRequest).length !== 0) sheetData.requests.push(sheetRequest);
      if (Object.keys(updateRequest).length !== 0) updateData.data.push(updateRequest);
    });
    console.log(this.staged, sheetData, updateData);
    this.staged = [];
    if (sheetData.requests.length !== 0) {
      await window.gapi.client.sheets.spreadsheets.batchUpdate({
        spreadsheetId: this.sheetId,
      }, sheetData);
    }
    if (updateData.data.length !== 0) {
      await window.gapi.client.sheets.spreadsheets.values.batchUpdate({
        spreadsheetId: this.sheetId,
      }, updateData);
    }
  }
}
