import './sourcemap-register.cjs';/******/ /* webpack/runtime/compat */
/******/ 
/******/ if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = new URL('.', import.meta.url).pathname.slice(import.meta.url.match(/^file:\/\/\/\w:/) ? 1 : 0, -1) + "/";
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

var __createBinding = (undefined && undefined.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (undefined && undefined.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (undefined && undefined.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core = __importStar(require("@actions/core"));
var axios = require('axios').default;
function run() {
    return __awaiter(this, void 0, void 0, function () {
        var slackWebhookUrl, slackChannel, slackUsername, pullRequestNumber, pullRequestTitle, pullRequestUrl, pullRequestAuthor, pullRequestAuthorIconUrl, payload;
        return __generator(this, function (_a) {
            slackWebhookUrl = core.getInput('SLACK_WEBHOOK_URL') ? core.getInput('SLACK_WEBHOOK_URL') : process.env.SLACK_WEBHOOK_URL;
            slackChannel = core.getInput('SLACK_CHANNEL') ? core.getInput('SLACK_CHANNEL') : 'general';
            slackUsername = core.getInput('SLACK_USERNAME') ? core.getInput('SLACK_USERNAME') : 'SlackNotifications';
            pullRequestNumber = core.getInput('PULL_REQUEST_NUMBER') ? core.getInput('PULL_REQUEST_NUMBER') : process.env.PULL_REQUEST_NUMBER;
            pullRequestTitle = core.getInput('PULL_REQUEST_TITLE') ? core.getInput('PULL_REQUEST_TITLE') : process.env.PULL_REQUEST_TITLE;
            pullRequestUrl = core.getInput('PULL_REQUEST_URL') ? core.getInput('PULL_REQUEST_URL') : process.env.PULL_REQUEST_URL;
            pullRequestAuthor = core.getInput('PULL_REQUEST_AUTHOR') ? core.getInput('PULL_REQUEST_AUTHOR') : process.env.PULL_REQUEST_AUTHOR;
            pullRequestAuthorIconUrl = core.getInput('PULL_REQUEST_AUTHOR_ICON_URL') ? core.getInput('PULL_REQUEST_AUTHOR_ICON_URL') : process.env.PULL_REQUEST_AUTHOR_ICON_URL;
            // validate that we have a slack webhook url
            if (!slackWebhookUrl) {
                core.setFailed('A slack webhook url is required to run this action.');
                // error
                throw new Error('A slack webhook url is required to run this action.');
            }
            // initial info
            core.info("Sending slack notification to ".concat(slackWebhookUrl));
            // debug start
            core.debug(new Date().toTimeString()); // debug is only output if you set the secret `ACTIONS_RUNNER_DEBUG` to true
            payload = {
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
                                    text: "*<".concat(pullRequestUrl, "|[").concat(pullRequestNumber, "] ").concat(pullRequestTitle, ">*")
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
            };
            // make the request
            axios.post(slackWebhookUrl, payload)
                .then(function (res) {
                // if the status code is not 2xx
                if (res.status >= 400) {
                    // throw an error
                    error(res.status);
                    return;
                }
                // output the status
                core.setOutput('statusCode', res.status);
                // report on the status code
                core.info("Received status code: ".concat(res.status));
                // debug end
                core.info(new Date().toTimeString());
            })
                .catch(function (err) {
                error(err.status);
                return;
            });
            return [2 /*return*/];
        });
    });
}
function error(statusCode) {
    // set the action to failed
    core.setFailed("Received status code: ".concat(statusCode));
    // throw an error
    throw new Error("Request failed with status code: ".concat(statusCode));
}
run();


//# sourceMappingURL=index.js.map