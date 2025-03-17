* Spotify-Claude MCP Server
A tool that connects to the Spotify API and uses Claude as an AI assistant for enhanced music discovery and interaction.

** Overview
This project integrates Claude AI with the Spotify API through a Model Control Protocol (MCP) server. It allows users to interact with their Spotify account using natural language queries processed by Claude.

** Features
Currently the claude can get the Artist information using the SpotifyAPI. This can be extended for other queries, such as getting top tracks, or genres, creating playlists, or getting user profile data

** Prerequisites
 - Spotify Developer Account
 - Spotify API credentials (Client ID and Client Secret)
 - Claude Desktop


** Installation

1. Clone the repository:
```
git clone https://github.com/DivyamAgg24/SpotifyMCP.git
cd SpotifyMCP
```

2. Install dependencies:
```
npm install
```

3. Set up environment variables:
Create a .env file in the root directory with the following variables:
```
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_ACCESS_TOKEN=access_token_obtained_from_clientId_and_clientSecret
```

** Configuration

Register your app in the Spotify Developer Dashboard
Add http://localhost:8888/callback as a Redirect URI in your Spotify app settings
Copy the Client ID and Client Secret to your .env file

Usage

1. Build the project
```
tsc -b
```

2. Add MCP Server configuration in Claude config file

3. Prompt Claude about the name of the artist

** Tool Functions
The MCP server exposes the following function to Claude:

get_artist(name): Retrieves information about an artist

Example Interactions
```
User: "What is the artist name?"
Claude: [Uses get_artist function] "The artist name is Pitbull."
```

MCP Server: Handles communication between Claude and the Spotify API
Spotify API Client: Manages authentication and API requests to Spotify
Claude Integration: Processes natural language and determines which functions to call