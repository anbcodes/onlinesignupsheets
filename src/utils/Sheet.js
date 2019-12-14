export default class Sheet {
  constructor(name) {
    this.name = name;
    this.sheetId = this.loadSheet();
  }

  async loadSheet() {
    if (localStorage.getItem(this.name)) {
      return localStorage.getItem(this.name);
    }

    const response = await window.gapi.client.sheets.spreadsheets.create({
      properties: {
        title: this.name,
      },
    });

    localStorage.setItem(`Sheet-${this.name}`, response.spreadsheetId);
    return response.spreadsheetId;
  }
}
