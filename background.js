browser.browserAction.onClicked.addListener(async (tab) => {
    try {
        await browser.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            func: async () => {
                var links = document.getElementsByTagName('a');
                var match_ids = [];
                for (var i = 0; i < links.length; i++) {
                    console.log(links[i].href);
                    if (links[i].href.includes('en/cs2/room/')) {
                        const regex = /[0-9a-z]{1}-[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/g;
                        const found = links[i].href.match(regex);
                        
                        if (found) {
                            match_ids.push(found[0]);
                            console.log(found[0]);
                        }
                    }
                }
                
                var match_ids_json = JSON.stringify(match_ids);
                console.log('Match ids: ' + match_ids_json);
                try {
                    await navigator.clipboard.writeText(match_ids_json);
                  } catch (error) {
                    console.error(error.message);
                }
            },
        });
    } catch (err) {
        console.error(`failed to execute script: ${err}`);
    }
});