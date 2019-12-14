import credentials from '../assets/credentials';

export default {
  init() {
    window.gapi.load('client:auth2', () => {
      window.gapi.client.init({
        apiKey: credentials.apiKey,
        clientId: credentials.clientId,
        scope: 'profile email https://www.googleapis.com/auth/drive.file',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4', 'https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
      });
    });
  },
  renderLoginButton(id, onSuccess) {
    window.gapi.signin2.render('google-signin-btn', {
      scope: 'profile email https://www.googleapis.com/auth/drive.file',
      width: 320,
      height: 80,
      longtitle: true,
      theme: 'dark',
      onsuccess: onSuccess,
    });
  },
};
