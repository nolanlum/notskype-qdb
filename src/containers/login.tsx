import {Component} from "inferno";

export default class Login extends Component<{}, {}> {
    render() {
        return (
            <a href="https://slack.com/oauth/authorize?scope=identity.basic,identity.email,identity.team&client_id=2370882641.196124303072"><img alt="Sign in with Slack" height="40" width="172" src="https://platform.slack-edge.com/img/sign_in_with_slack.png" srcset="https://platform.slack-edge.com/img/sign_in_with_slack.png 1x, https://platform.slack-edge.com/img/sign_in_with_slack@2x.png 2x" /></a>
        );
    }
}

