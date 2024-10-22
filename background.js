browser.browserAction.onClicked.addListener(async (tab) => {
    // disable the browser action for the tab
    // browser.browserAction.disable(tab.id);
    // requires the "tabs" or "activeTab" permission, or host permissions for the URL
    //console.log(tab.url);
    // const links = content.document.querySelectorAll('a');

    // for (const link of links) {
    //     console.log(link.href); // Prints the URL of each link
    // }

    try {
        await browser.scripting.executeScript({
            target: {
                tabId: tab.id,
            },
            func: () => {
                document.body.style.border = "5px solid green";
                // const links = document.querySelectorAll('a');

                // for (const link of links) {
                //     console.log(link.href); // Prints the URL of each link
                // }

                // for (const link in document.links) {
                //     console.log(link.href);
                // }
                // https://www.faceit.com/en/cs2/room/1-303bcfc7-ff80-4028-bf06-69f1adebd748
                // en\/cs2\/room\/[0-9a-z]{1}-[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}

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

                console.log('Match ids: ' + JSON.stringify(match_ids));
            },
        });
    } catch (err) {
        console.error(`failed to execute script: ${err}`);
    }
});