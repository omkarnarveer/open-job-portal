#Open-Source Job Portal
An open-source job portal designed to connect job seekers with relevant job listings. This project is a full-stack web application built to provide a platform for employers to post job openings and for job seekers to find and apply for jobs efficiently.

Features
User Authentication: Secure registration and login for both job seekers and employers.

Job Listing Management: Employers can create, edit, delete, and manage their job postings from a dedicated dashboard.

Advanced Job Search: Job seekers can search and filter job listings by keywords, location, job type, and more.

Application Tracking: Job seekers have a personal dashboard to view and manage the status of their job applications.

Detailed User Profiles: Dedicated profiles for job seekers and employers to showcase their skills, work history, and company information.

Responsive Design: The application is built to be accessible and user-friendly on all devices, from desktops to mobile phones.

Technologies Used
Frontend
React: A JavaScript library for building dynamic user interfaces.

Tailwind CSS: A utility-first CSS framework for rapid and responsive UI development.

Backend
Django: A high-level Python web framework that encourages rapid development and clean, pragmatic design.

Django REST Framework: A powerful toolkit for building Web APIs.

MySQL: An open-source relational database management system for storing application data.

Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Python 3.8+

Node.js and npm

MySQL Server

Backend Setup (Django & MySQL)
Clone the repository:

git clone [https://github.com/omkarnarveer/open-job-portal.git](https://github.com/omkarnarveer/open-job-portal.git)
cd open-job-portal/backend

Create and activate a virtual environment:

python -m venv venv
# On Windows
venv\Scripts\activate
# On macOS/Linux
source venv/bin/activate

Install backend dependencies:

pip install -r requirements.txt

Configure your MySQL database:

Create a new MySQL database for the project.

Update the DATABASES settings in settings.py with your MySQL credentials.

Run migrations and create a superuser:

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

Start the backend server:

python manage.py runserver

The backend API will be running at http://127.0.0.1:8000.

Frontend Setup (React & Tailwind CSS)
Navigate to the frontend directory:

cd ../frontend

Install frontend dependencies:

npm install

Start the frontend development server:

npm start

The frontend application will be available at http://localhost:3000.

Project Structure
open-job-portal/
├── backend/
│   ├── job_portal/
│   ├── job_api/
│   ├── manage.py
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── pages/
    │   ├── App.js
    │   ├── index.js
    │   └── ...
    ├── public/
    └── package.json

Contributing
We welcome contributions! Please feel free to open an issue or submit a pull request. For major changes, please open an issue first to discuss what you would like to change.

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Commit your changes (git commit -m 'Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Create a Pull Request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Contact
For any questions or suggestions, please visit the project's GitHub repository:

https://github.com/omkarnarveer/open-job-portal

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
 open-job-portal
