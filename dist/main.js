"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(require("@actions/core"));
const http_1 = require("./http");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const slackWebhookUrl = core.getInput('SLACK_WEBHOOK_URL') ? core.getInput('SLACK_WEBHOOK_URL') : process.env.SLACK_WEBHOOK_URL;
        const slackChannel = core.getInput('SLACK_CHANNEL') ? core.getInput('SLACK_CHANNEL') : 'general';
        const slackUsername = core.getInput('SLACK_USERNAME') ? core.getInput('SLACK_USERNAME') : 'SlackNotifications';
        const pullRequestNumber = core.getInput('PULL_REQUEST_NUMBER') ? core.getInput('PULL_REQUEST_NUMBER') : process.env.PULL_REQUEST_NUMBER;
        const pullRequestTitle = core.getInput('PULL_REQUEST_TITLE') ? core.getInput('PULL_REQUEST_TITLE') : process.env.PULL_REQUEST_TITLE;
        const pullRequestUrl = core.getInput('PULL_REQUEST_URL') ? core.getInput('PULL_REQUEST_URL') : process.env.PULL_REQUEST_URL;
        const pullRequestAuthor = core.getInput('PULL_REQUEST_AUTHOR') ? core.getInput('PULL_REQUEST_AUTHOR') : process.env.PULL_REQUEST_AUTHOR;
        const pullRequestAuthorIconUrl = core.getInput('PULL_REQUEST_AUTHOR_ICON_URL') ? core.getInput('PULL_REQUEST_AUTHOR_ICON_URL') : process.env.PULL_REQUEST_AUTHOR_ICON_URL;
        // validate that we have a slack webhook url
        if (!slackWebhookUrl) {
            core.setFailed('A slack webhook url is required to run this action.');
            // error
            throw new Error('A slack webhook url is required to run this action.');
        }
        // initial info
        core.info(`Sending slack notification to ${slackWebhookUrl}`);
        // debug start
        core.debug(new Date().toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
        const payload = JSON.stringify({
            channel: slackChannel,
            username: slackUsername,
            attachments: [
                {
                    color: "#f74ea1",
                    blocks: [
                        {
                            type: "section",
                            block_id: "pull_request_details",
                            text: {
                                type: "mrkdwn",
                                text: `*<${pullRequestUrl}|[${pullRequestNumber}] ${pullRequestTitle}>*`
                            }
                        },
                        {
                            type: "context",
                            block_id: "author",
                            elements: [
                                {
                                    type: "image",
                                    image_url: pullRequestAuthorIconUrl,
                                    alt_text: "images"
                                },
                                {
                                    type: "mrkdwn",
                                    text: pullRequestAuthor
                                }
                            ]
                        },
                        {
                            type: "actions",
                            elements: [
                                {
                                    type: "button",
                                    text: {
                                        type: "plain_text",
                                        text: "View Pull Request",
                                        emoji: true
                                    },
                                    value: pullRequestTitle,
                                    url: pullRequestUrl,
                                    action_id: "actionId-0",
                                    style: "primary"
                                }
                            ]
                        }
                    ]
                }
            ]
        });
        // make the request
        http_1.http
            .make(slackWebhookUrl, payload)
            .then(res => {
            // if the status code is not 2xx
            if (res.status >= 400) {
                // throw an error
                error(res.status);
                return;
            }
            // output the status
            core.setOutput('statusCode', res.status);
            // report on the status code
            core.info(`Received status code: ${res.status}`);
            // debug end
            core.info(new Date().toTimeString());
        })
            .catch(err => {
            error(err.status);
            return;
        });
    });
}
function error(statusCode) {
    // set the action to failed
    core.setFailed(`Received status code: ${statusCode}`);
    // throw an error
    throw new Error(`Request failed with status code: ${statusCode}`);
}
run();
