```markdown
# Emmerce Project

## Overview

This project is a full-stack application with a Django backend and a Vue 3 frontend using the Vuexy template. The backend and frontend communicate via a token-based API.

## Prerequisites

- Python 3.x
- Node.js
- Yarn
- npm

## Backend Setup (Django)

1. **Clone the repository:**

   ```sh
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Create a virtual environment:**

   ```sh
   python -m venv env
   ```

3. **Activate the virtual environment:**

   - On Windows:

     ```sh
     .\env\Scripts\activate
     ```

   - On macOS/Linux:

     ```sh
     source env/bin/activate
     ```

4. **Install the required Python packages:**

   ```sh
   pip install -r requirements.txt
   ```

5. **Run database migrations:**

   No need to set up a new database as SQLite is used by default.

   ```sh
   python manage.py migrate
   ```

6. **Create a superuser:**

   ```sh
   python manage.py createsuperuser
   ```

7. **Run the Django development server:**

   ```sh
   python manage.py runserver
   ```

## Frontend Setup (Vue 3)

1. **Navigate to the `Frontend` directory:**

   ```sh
   cd Frontend
   ```

2. **Install the required Node.js packages:**

   ```sh
   yarn install
   ```

3. **Run the Vue development server:**

   ```sh
   yarn serve
   ```

## Connecting Frontend to Backend

The frontend is connected to the Django backend via a token-based API. Ensure that the backend server is running before starting the frontend server.

## Running the Application

1. **Start the Django backend server:**

   ```sh
   python manage.py runserver
   ```

2. **Start the Vue frontend server:**

   ```sh
   cd Frontend
   yarn serve
   ```

Open your browser and navigate to `http://localhost:8080` to view the application.

## Additional Information

- The backend uses SQLite, so there is no need to set up a new database.
- The frontend is built using Vue 3 and the Vuexy template.
- Ensure that both the backend and frontend servers are running to use the application.

# Celery Configuration

The configuration sets up:

- Redis as the message broker
- Django's database as the result backend
- JSON as the serialization format
- Task timeouts and monitoring
- Periodic task scheduling with django-celery-beat
- Email configuration for notification tasks


## Run the configuration

### Terminal 2: Celery worker
  ```sh
celery -A crm_project worker -l info
 ```

### Terminal 3: Celery beat

```sh
celery -A crm_project beat -l info

```

### The setup allows one to:

- Process background tasks asynchronously
- Schedule periodic tasks
- Monitor task execution
- Store task results
- Handle task retries and failures
- Send emails asynchronously
- Cache results using Redis