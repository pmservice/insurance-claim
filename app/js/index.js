console.log('Up and running!');

class MainController {
	constructor() {
		console.log('constructor');
		this.user = {
			name: 'Ali',
		};
	}

	fileClaim() {
		console.log('fileClaim');
		window.location = 'userPage.html';
	}
	manageClaim() {
		console.log('manageClaim');
	}
}


const controller = new MainController();
