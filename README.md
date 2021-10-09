# 📩 Revue Convertkit Sync

Uses GitHub Actions to run scheduled syncs between [Revue](https://www.getrevue.co) subscribers and [Convertkit](https://convertkit.com/).

## 🚀 Quickstart

* Fork this repository or [create from template](https://github.com/colbyfayock/revue-convertkit-sync/generate)
* Add the following environment variables as [GitHub Secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets#creating-encrypted-secrets-for-a-repository):

**Required**
```
REVUE_API_KEY
CONVERTKIT_API_KEY
CONVERTKIT_FORM_ID
```

**Optional**
```
CONVERTKIT_TAGS
SENDGRID_API_KEY
MAIL_TO
MAIL_FROM
```

## 🤔 Why?

Twitter came out with a feature whre you can now prominently display a newsletter subscription form on your profile, however it only works with their Revue service.

To take advantage of both worlds, this takes the people who subscribe with Revue and moves them over to Convertkit

### Inspiration

See [@QuinnyPig's thread](https://twitter.com/QuinnyPig/status/1445202123155664900) on how he achieved this with Zapier and such.

## 🛠 How it works

The core of the repo is a node script that uses the [Revue API](https://www.getrevue.co/api) and the [Convertkit API](https://developers.convertkit.com/) to communicate with each other.

GitHub Actions are used as a scheduling mechanism that allows us to run that script at the frequency we choose.

## 🧑‍🚀 Getting Started

### Configuration

In order to use this repo you can simply clone, fork, or create a new repo from a templatee and do nothing else other than add environment variables via GitHub Secrets.

There's a mix of required and optional fields that just extend the functionality of the script that gets ran.

| Name                | Req? | Description                                                               |
| ------------------- | ---- | ------------------------------------------------------------------------- |
| REVUE_API_KEY       | Yes  | API key from getrevue.co                                                  |
| CONVERTKIT_API_KEY  | Yes  | API key from convertkit.com                                               |
| CONVERTKIT_FORM_ID  | Yes  | Convertkit form ID to subscribe accounts to (ex: 12345)                   |
| CONVERTKIT_TAGS     |      | Convertkit tag IDs to add to subscribers delimited by , (ex: 12345,54321) |
| SENDGRID_API_KEY    |      | API key from sendgrid.com with Mail Send permission                       |
| MAIL_TO             |      | Email address to send mail to                                             |
| MAIL_FROM           |      | Email address to send mail from (configured with Sendgrid)                |

### Changing Frequency / Schedule

The Action uses cron to schedule when it will run. You can update that at the top of the workflow file:

https://github.com/colbyfayock/revue-convertkit-sync/blob/main/.github/workflows/sync.yml#L5
