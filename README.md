# Revue Convertkit Sync

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

