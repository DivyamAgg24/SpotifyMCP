import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from 'dotenv';

import { z } from "zod";

dotenv.config()
const server = new McpServer({
    name: "spotify",
    version: "1.0.0",
});

const accessToken = "BQDx7I7jtZBsLKZ7Fsoo4HVH4rQI_kAcFlq_S-zo20nT1UpNcbR9YShjl8QRAAd9Vb1eldP6SHtikO-l12kiv9ZrUEhYHQl7PcR6-MGHlTUNYXRifeXz5G5vX4G017MTpB9dUer3ykI"

server.tool(
    "get_artist",
    "Get Artist name",
    {
      method: z.string().min(3).describe("Get or post request")
    },
    async ({ method }) => {
      const methodUpper = method.toUpperCase();
      const artistData = await fetch("https://api.spotify.com/v1/artists?ids=0TnOYISbd1XYRBk9myaseg", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        method
    })
    
    if (!artistData) {
    return {
        content: [
        {
            type: "text",
            text: "Failed to retrieve tracks",
        },
        ],
    };
    }
    const allArtistsData = await artistData.json()
    console.log(allArtistsData)
    const data = allArtistsData.artists || [];
    if (data.length===0) {
    return {
        content: [
        {
            type: "text",
            text: `No artists`,
        },
        ],
    };
    }
    let names = []
    for(let i = 0; i<data.length; i++){
        names.push(data[i].name)
    }

    const finalOutput = `Artist name is ${names}`;

    return {
        content: [
            {
                type: "text",
                text: finalOutput,
            },
        ],
        };
    },
)



async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("Spotify MCP running on studio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });
