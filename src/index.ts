import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
    ListResourcesRequestSchema,
    ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { z } from "zod";

const server = new McpServer({
    name: "spotify",
    version: "1.0.0",
});

const accessToken = "BQDXv6W9V4XHijjzJgY9HKFwRwSZRrlu5u-eT5bsJOBOX_F4NLHkYSRVi4nplipafGMVdAHajVMhEZZBx-s2ECJQ-IPJR-Jmi3gPtUSEnP7-l4hks2BM-lnXOdKo5A56ItO7ICiupks"

// async function fetchWebApi(endpoint: string, method: string) {
//     const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       method,
//     //   body:JSON.stringify(body)
//     });
//     return await res.json();
//   }
  
//   async function getTopTracks(){
//     // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//     return (await fetchWebApi(
//       'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
//     )).items;
//   }

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
    console.error("Weather MCP Server running on stdio");
  }
  
  main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
  });




/*
{
    "access_token": 
    "token_type": "Bearer",
    "expires_in": 3600
}
*/