# 🚀 Slack Notification on Pull Request

[![GitHub Release][ico-release]][link-github-release]
[![License][ico-license]](LICENSE)

A Github Action for sending slack notifications whenever a pull request is opened!

<hr/>

## Usage

Example:

```yml
- name: Slack Notification on Pull Request
  uses: joelwmale/slack-notification-on-pull-request-action@master
  env:
    SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
    SLACK_CHANNEL: 'general'
    PULL_REQUEST_NUMBER : ${{ github.event.pull_request.number }}
    PULL_REQUEST_TITLE : ${{ github.event.pull_request.title }}
    PULL_REQUEST_URL : ${{ github.event.pull_request.html_url }}
    PULL_REQUEST_AUTHOR : ${{ github.event.pull_request.user.login }}
    PULL_REQUEST_AUTHOR_ICON_URL : ${{ github.event.pull_request.user.avatar_url }}
```

It is **highly** recommended to use the action is an explicit commit SHA-1:

`uses = "joelwmale/slack-notification-on-pull-request-action@{SHA-1}"` to find a commit click [here.](https://github.com/joelwmale/slack-notification-on-pull-request-action/commits/master)

## Action Input

The action has support for the following input variables (arguments):

* **`SLACK_WEBHOOK_URL`** (**required**): The slack webhook url to send to
* **`SLACK_CHANNEL`** (**optional**): The slack channel to send to (defaults to **general**)

## Issues

If you find any issues or have an improvement feel free to [submit an issue](https://github.com/joelwmale/slack-notification-on-pull-request-action/issues/new)

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[ico-release]: https://img.shields.io/github/tag/joelwmale/slack-notification-on-pull-request-action.svg
[ico-license]: https://img.shields.io/badge/license-MIT-brightgreen.svg
[link-github-release]: https://github.com/joelwmale/slack-notification-on-pull-request-action/releases