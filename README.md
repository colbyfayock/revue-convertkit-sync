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
