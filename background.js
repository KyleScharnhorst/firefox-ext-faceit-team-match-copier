browser.browserAction.onClicked.addListener(async (tab) => {
    try {
        await browser.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            func: async () => {
                var links = document.getElementsByTagName('a');
                var match_ids = []; // Array to store extracted match IDs

                // Loop through all the links on the page
                for (var i = 0; i < links.length; i++) {
                    console.log(links[i].href); // Log the href of each link

                    // Check if the link contains the specific path 'en/cs2/room/'
                    if (links[i].href.includes('en/cs2/room/')) {
                        // Regular expression to match the specific UUID pattern
                        const regex = /[0-9a-z]{1}-[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/g;
                        const found = links[i].href.match(regex); // Extract matches

                        // If a match is found, add it to the match_ids array
                        if (found) {
                            match_ids.push(found[0]);
                            console.log(found[0]); // Log the matched ID
                        }
                    }
                }

                // Convert the match_ids array to a JSON string
                var match_ids_json = JSON.stringify(match_ids);
                console.log('Match ids: ' + match_ids_json); // Log the JSON string

                // Attempt to copy the JSON string to the clipboard
                try {
                    await navigator.clipboard.writeText(match_ids_json);
                } catch (error) {
                    console.error(error.message); // Log any errors that occur
                }
            },
        });
    } catch (err) {
        console.error(`failed to execute script: ${err}`);
    }
});