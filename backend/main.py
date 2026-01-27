from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime, timedelta
import random

app = FastAPI(title="Statistics API", version="1.0.0")

# Configure CORS to allow React frontend to communicate
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "message": "Statistics API",
        "version": "1.0.0",
        "endpoints": {
            "/": "API information",
            "/api/stats/sales": "Monthly sales data",
            "/api/stats/users": "User growth statistics",
            "/api/stats/performance": "Performance metrics"
        }
    }

@app.get("/api/stats/sales")
async def get_sales_stats():
    """Get monthly sales statistics"""
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    sales_data = [
        {"month": month, "sales": random.randint(5000, 20000), "revenue": random.randint(50000, 200000)}
        for month in months
    ]
    return {
        "title": "Monthly Sales Statistics",
        "data": sales_data
    }

@app.get("/api/stats/users")
async def get_user_stats():
    """Get user growth statistics"""
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    base_users = 1000
    user_data = []
    
    for i, month in enumerate(months):
        base_users += random.randint(100, 500)
        user_data.append({
            "month": month,
            "total_users": base_users,
            "new_users": random.randint(100, 500),
            "active_users": int(base_users * random.uniform(0.6, 0.9))
        })
    
    return {
        "title": "User Growth Statistics",
        "data": user_data
    }

@app.get("/api/stats/performance")
async def get_performance_stats():
    """Get system performance metrics"""
    categories = ["CPU Usage", "Memory Usage", "Disk I/O", "Network", "Database"]
    performance_data = [
        {
            "category": category,
            "value": random.randint(30, 95),
            "status": "healthy" if random.random() > 0.3 else "warning"
        }
        for category in categories
    ]
    return {
        "title": "System Performance Metrics",
        "data": performance_data
    }

@app.get("/api/stats/revenue")
async def get_revenue_breakdown():
    """Get revenue breakdown by category"""
    categories = ["Product Sales", "Subscriptions", "Services", "Consulting", "Other"]
    revenue_data = [
        {
            "category": category,
            "amount": random.randint(10000, 100000),
            "percentage": 0  # Will be calculated on frontend
        }
        for category in categories
    ]
    
    total = sum(item["amount"] for item in revenue_data)
    for item in revenue_data:
        item["percentage"] = round((item["amount"] / total) * 100, 1)
    
    return {
        "title": "Revenue Breakdown",
        "data": revenue_data,
        "total": total
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
