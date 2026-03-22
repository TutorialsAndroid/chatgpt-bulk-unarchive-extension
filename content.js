let running = false;

chrome.runtime.onMessage.addListener(async (msg) => {

    if (msg.action === "START") {

        running = true;

        const delay = (ms) => new Promise(r => setTimeout(r, ms));

        let total = 0;

        let dialog = null;

        for (let i = 0; i < 10; i++) {
            dialog = document.querySelector('[role="dialog"]');
            if (dialog) break;
            await delay(1000);
        }

        if (!dialog) {
            alert("Open Archived Chats window first");
            return;
        }

        while (running) {

            let btn = document.querySelector(
                'button[aria-label="Unarchive conversation"]'
            );

            if (!btn) {

                dialog.scrollBy(0, 500);

                await delay(1000);

                btn = document.querySelector(
                    'button[aria-label="Unarchive conversation"]'
                );

                if (!btn) break;
            }

            btn.click();

            total++;

            // send progress update
            chrome.runtime.sendMessage({
                type: "progress",
                value: total
            });

            await delay(6000);
        }

    }


    if (msg.action === "STOP") {

        running = false;

    }

});