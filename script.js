* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: Arial, sans-serif;
    background: #f7f8fa;
    color: #202124;
    min-height: 100vh;
}


/* Top bar */

.topbar {
    height: 60px;
    background: white;
    border-bottom: 1px solid #e5e7eb;

    display: flex;
    align-items: center;
    justify-content: space-between;

    padding: 0 20px;

    position: sticky;
    top: 0;
    z-index: 10;
}

.logo {
    font-size: 21px;
    font-weight: bold;
}

.new-chat {
    border: none;
    background: #111827;
    color: white;

    padding: 9px 14px;
    border-radius: 8px;

    cursor: pointer;
}


/* Main */

.app {
    width: min(900px, 94%);
    margin: auto;

    min-height: calc(100vh - 60px);

    display: flex;
    flex-direction: column;
}


/* Welcome */

.welcome {
    text-align: center;

    margin-top: 90px;
    margin-bottom: 40px;
}

.welcome h1 {
    font-size: 36px;
    margin-bottom: 12px;
}

.welcome p {
    color: #6b7280;
    line-height: 1.6;
}


/* Chat */

.chat {
    width: 100%;
    padding-bottom: 20px;
}

.message {
    display: flex;
    margin: 15px 0;
}

.message.user {
    justify-content: flex-end;
}

.message.ai {
    justify-content: flex-start;
}

.message-content {
    max-width: 75%;
    padding: 13px 16px;

    border-radius: 14px;

    line-height: 1.5;
}

.user .message-content {
    background: #111827;
    color: white;
}

.ai .message-content {
    background: white;
    border: 1px solid #e5e7eb;
}


/* Quick buttons */

.quick-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    margin-bottom: 15px;
}

.quick-actions button {
    border: 1px solid #dfe3e8;
    background: white;

    padding: 9px 13px;

    border-radius: 20px;

    cursor: pointer;

    font-size: 14px;
}

.quick-actions button:hover {
    background: #f0f2f5;
}


/* Input */

.input-area {
    position: sticky;
    bottom: 0;

    background: #f7f8fa;

    padding-bottom: 15px;
}

.input-box {
    background: white;

    border: 1px solid #d5d9df;
    border-radius: 16px;

    min-height: 58px;

    display: flex;
    align-items: flex-end;

    padding: 8px;
}

textarea {
    flex: 1;

    border: none;
    outline: none;

    resize: none;

    font-family: inherit;
    font-size: 16px;

    padding: 9px;

    min-height: 40px;
}

.upload-btn,
.send-btn {
    width: 40px;
    height: 40px;

    border: none;
    background: transparent;

    border-radius: 50%;

    cursor: pointer;

    font-size: 19px;
}

.send-btn {
    background: #111827;
    color: white;
}

.upload-btn:hover {
    background: #f0f2f5;
}


/* File */

.file-info {
    font-size: 13px;
    margin-top: 6px;
    color: #555;
}


/* Small text */

.small-text {
    text-align: center;

    color: #888;

    font-size: 11px;

    margin-top: 7px;
}


/* Mobile */

@media (max-width: 600px) {

    .topbar {
        padding: 0 12px;
    }

    .welcome {
        margin-top: 60px;
    }

    .welcome h1 {
        font-size: 28px;
    }

    .message-content {
        max-width: 88%;
    }

    .quick-actions {
        overflow-x: auto;
        flex-wrap: nowrap;
        padding-bottom: 5px;
    }

    .quick-actions button {
        white-space: nowrap;
    }
