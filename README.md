# Hipmunk Coding Challenge - Flight Search

Provides REST API to search all airline providers for flight information, sorted by agony.

# Getting Started

1) Make sure scrapper service is running 
2) npm install
3) node server.js
    - Pass PORT env variable for custom port (default to 8000)
    - Pass SEARCH_URL env variable for custom scrapper url (default to http://localhost:9000/scrapers/)
4) Invoke GET operation http://host:port/flights/search (e.g. http://localhost:8000/flights/search)

