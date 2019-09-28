
const clientId = '4295955896-bqbbcn1le6q298aebo7ttaev8i6p4p0r.apps.googleusercontent.com';

export let authInstance = null;
export function getAuthInstance() {
	return new Promise( (resolve, reject) => {
		if (authInstance) {
			resolve(authInstance);
		}
	
		window.gapi.load('auth2', () => {
			window.gapi.auth2.init({
				'client_id': clientId,
				'scope': 'profile',
			}).then(instance => {
				authInstance = instance;
				resolve(authInstance);
			})
		});
	})
}
