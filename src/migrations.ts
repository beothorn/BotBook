import { defaultSystemEntry } from "./prompts/promptGenerator";

const migrations = [
    () => {
        console.error("Migration from version 0 does not exist");
    },
    () => {
        console.log("Running migration from version 1 to 2");
        const storedState = localStorage.getItem("1") || "{}";
        const loadedInitialState = JSON.parse(storedState);
        loadedInitialState.version = "2";
        localStorage.setItem("2", JSON.stringify(loadedInitialState));
        localStorage.setItem("currentVersion", "2");
    },
    () => {
        console.log("Running migration from version 2 to 3");
        const storedState = localStorage.getItem("2") || "{}";
        const loadedInitialState = JSON.parse(storedState);

        Object.entries(loadedInitialState.contacts).forEach(([key, _contact]: [any, any]) => {
            const c = loadedInitialState.contacts[key];
            c.contactSystemEntryTemplate = defaultSystemEntry;
            delete c.contactSystemEntry;
        });

        loadedInitialState.version = "3";
        localStorage.setItem("3", JSON.stringify(loadedInitialState));
        localStorage.setItem("currentVersion", "3");
    },
    () => {
        console.log("Running migration from version 3 to 4");
        const storedState = localStorage.getItem("3") || "{}";
        const loadedInitialState = JSON.parse(storedState);

        Object.entries(loadedInitialState.contacts).forEach(([key, _contact]: [any, any]) => {
            const c = loadedInitialState.contacts[key];
            c.type = 'bot';
        });

        loadedInitialState.version = "4";
        localStorage.setItem("4", JSON.stringify(loadedInitialState));
        localStorage.setItem("currentVersion", "4");
    },
    () => {
        console.log("Running migration from version 4 to 5");
        const storedState = localStorage.getItem("4") || "{}";
        const loadedInitialState = JSON.parse(storedState);

        loadedInitialState.groupChatsParticipants = {};

        loadedInitialState.version = "5";
        localStorage.setItem("5", JSON.stringify(loadedInitialState));
        localStorage.setItem("currentVersion", "5");
    },
    () => {
        console.log("Running migration from version 5 to 6");
        const storedState = localStorage.getItem("5") || "{}";
        const loadedInitialState = JSON.parse(storedState);

        loadedInitialState.settings.singleBotSystemEntryContext = `The character is talking with a friend %USER_NAME%. The friend profile is '%USER_INFO%'.`;
        loadedInitialState.settings.chatGroupSystemEntryContext = `The character is talking on a chat group with name %CHAT_GROUP_NAME% and description '%CHAT_GROUP_DESCRIPTION%'.`;

        Object.entries(loadedInitialState.contacts).forEach(([key, _contact]: [any, any]) => {
            const c = loadedInitialState.contacts[key];
            c.status = c.lastMessage;
            c.contextTemplate = loadedInitialState.settings.singleBotSystemEntryContext;
            delete c.lastMessage;
        });

        loadedInitialState.version = "6";
        localStorage.setItem("6", JSON.stringify(loadedInitialState));
        localStorage.setItem("currentVersion", "6");
    }
];

export default migrations;