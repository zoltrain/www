---
page_title: "Vagrant Cloud: 5 Weeks In"
title: "Vagrant Cloud: 5 Weeks In"
list_image_url: /images/blog/vagrant-cloud-5-weeks-in/logo-side.png
post_image_url: /images/blog/vagrant-cloud-5-weeks-in/logo-post.png
---

5 weeks after the initial beta release of Vagrant Cloud, we're excited
to announce some recent improvements, usage statistics and the public
availability of an API.

We've also begun a beta for our on-premise standalone version of Vagrant
Cloud we call Private Cloud. Read on for more.

READMORE

### Usage so far

We're really pleased with the adoption of Vagrant Cloud in the Vagrant
community. Notable users such as [Chef](https://vagrantcloud.com/chef),
[Puppet](https://vagrantcloud.com/puppetlabs) and [Ubuntu](https://vagrantcloud.com/ubuntu)
have signed up to distribute official Vagrant boxes.

Some high level statistics we track:

- We've seen 272,723 downloads of public Vagrant boxes via Vagrant 1.5
- Vagrant Share proxies an average of 35k HTTP requests daily
- We expect to pass the 10,000 user mark before the end of the month

### General Improvements

A number of features to improve Vagrant Cloud:

- Box favoriting
- Authentication token management
- Expanded user profiles
- Session re-authentication for sensitive actions
- Box and share statistics

### API

`v1` of the Vagrant Cloud API has been released. The API can be used to
automate release management of your boxes as well as perform CRUD
operations on your boxes, versions and providers.

An example of releasing a new version:

    curl https://vagrantcloud.com/api/v1/box/hashicorp/precise64/version/3/release \
            -X PUT \
            -d access_token=TOKEN

Comprehensive [documentation and guides](https://vagrantcloud.com/docs)
are available.

### Private Cloud

Vagrant Private Cloud shares the same codebase as what is running publicly
on vagrantcloud.com and runs completely within your firewall. It does
not require an external internet connection and does not phone home.

Vagrant Private Cloud supports every feature that is available on
vagrantcloud.com (including a custom "vagrant share" domain!), as well
as some additional features. The primary feature available to private
cloud customers is optional LDAP integration, allowing you to use your
existing LDAP directory to authenticate users.

If you're interested in learning more about Private Cloud, please
email us at [biz@hashicorp.com](mailto:biz@hashicorp.com).

### What's next?

Planned features include:

- Box uploads. Uploading boxes directly to Vagrant Cloud either via
the web console or the API, instead of providing a URL to the box file.
This will likely be a paid feature.
- Organizations, team management and access control. Management of
organizations and teams to allow read, write and admin access to specific
boxes or groups of boxes.
- Per-box "trust" analysis. We'll be introducing a system for providing
suggestions of how trustable a box is. Download numbers, favoriting,
user profiles and more supports the "trustability" of a box.

As always, please email us directly with feedback or questions
at [cloudbeta@hashicorp.com](mailto:cloudbeta@hashicorp.com).
