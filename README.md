# .github

Global repository for all other repositories to use.

## FastAPI + React Statistics Dashboard

A full-stack web application that displays graphical statistics with a FastAPI backend and React frontend.

### Features

- 📊 Real-time statistics visualization
- 📈 Multiple chart types (Line, Bar, Doughnut)
- 🔄 Automatic data refresh
- 🎨 Modern, responsive UI
- ⚡ Fast API backend with CORS support
- 🔗 RESTful API endpoints

### Technology Stack

**Backend:**
- FastAPI (Python web framework)
- Uvicorn (ASGI server)
- Pydantic (data validation)

**Frontend:**
- React 18
- Vite (build tool)
- Chart.js (data visualization)
- React-Chartjs-2 (React wrapper for Chart.js)

### Project Structure

```
.
├── backend/
│   └── main.py          # FastAPI application
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   ├── App.css      # Application styles
│   │   ├── index.css    # Global styles
│   │   └── main.jsx     # React entry point
│   ├── package.json     # Frontend dependencies
│   └── vite.config.js   # Vite configuration
├── requirements.txt     # Python dependencies
└── README.md
```

### Setup Instructions

#### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

#### Backend Setup

1. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

3. Run the FastAPI server:
```bash
cd backend
python main.py
```

The backend API will be available at `http://localhost:8000`

#### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Usage

1. Start the backend server first (see Backend Setup)
2. Start the frontend development server (see Frontend Setup)
3. Open your browser and navigate to `http://localhost:5173`
4. The dashboard will automatically fetch and display statistics from the API
5. Click the "🔄 Refresh Data" button to update the statistics

### API Endpoints

The backend provides the following REST API endpoints:

- `GET /` - API information and available endpoints
- `GET /api/stats/sales` - Monthly sales statistics
- `GET /api/stats/users` - User growth statistics
- `GET /api/stats/performance` - System performance metrics
- `GET /api/stats/revenue` - Revenue breakdown by category

### Development

#### Backend Development

To run the backend in development mode with auto-reload:
```bash
cd backend
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

#### Frontend Development

The Vite development server supports hot module replacement (HMR) by default:
```bash
cd frontend
npm run dev
```

#### Building for Production

Frontend build:
```bash
cd frontend
npm run build
```

The production-ready files will be in the `frontend/dist` directory.

### Customization

#### Adding New Statistics

1. Add a new endpoint in `backend/main.py`:
```python
@app.get("/api/stats/your-stat")
async def get_your_stat():
    return {
        "title": "Your Statistic",
        "data": [...]
    }
```

2. Update `frontend/src/App.jsx` to fetch and display the new data

#### Styling

- Modify `frontend/src/App.css` for component-specific styles
- Modify `frontend/src/index.css` for global styles

### Troubleshooting

**CORS errors:**
- Ensure the backend server is running on port 8000
- Check that CORS origins in `backend/main.py` include your frontend URL

**Connection refused:**
- Verify both backend and frontend servers are running
- Check that ports 8000 and 5173 are not blocked by a firewall

**Chart not displaying:**
- Check the browser console for errors
- Ensure data is being fetched successfully from the API

### License

This project is provided as-is for demonstration purposes.
