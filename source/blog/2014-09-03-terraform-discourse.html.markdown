---
page_title: "Deploying Discourse with Terraform"
title: "Deploying Discourse with Terraform"
list_image_url: "/images/blog/terraform-discourse/side.png"
post_image_url: "/images/blog/terraform-discourse/top.png"
tags: terraform
author: Jack Pearkes
---

In this blog post, we'll show how Terraform can create a running instance of
[Discourse](http://www.discourse.org/) on DigitalOcean in one command.

Following the release of [Terraform 0.2](http://www.terraform.io),
We wanted to publish the first of several examples of using
Terraform to automate the creation and management of infrastructure.

Terraform is abstract, so it can be hard to grasp and understand it's
capabilities without seeing and using it in a real world example. Even if you don't
intend to keep Discourse running, this may be a good chance to learn more about Terraform.

READMORE

## Discourse

Discourse is a discussion platform "built for the next decade of the Internet". That
means it uses modern frameworks and tools to run. Because of this, installing
Discourse can be challenging for new and inexperienced users.

Terraform, of course, is intended for a technical audience, but there's also
potential to build tooling around it to take advantage of it's automation and
friendly declarative configuration.

Discourse 1.0 [was just released](http://blog.discourse.org/2014/08/introducing-discourse-1-0/),
so we find it fitting to use it to see Terraform in action. This configuration was based on the [beginner installation guide](https://github.com/discourse/discourse/blob/master/docs/INSTALL-digital-ocean.md)
published by Discourse.

## Preparation Steps

Before running `terraform apply`, you'll need to have accounts and access
information for the configured providers.

*Note*: This example uses the [DigitalOcean](http://www.terraform.io/docs/providers/do/index.html)
and [Mailgun](http://www.terraform.io/docs/providers/mailgun/index.html) providers, but
you could modify the configuration to use any other Terraform providers
in place or in addition, like Route53 or DNSimple. For a full list of providers,
visit the [documentation](http://www.terraform.io/docs/providers/index.html).

1. Access or create a DigitalOcean Account
    - [Sign up](https://cloud.digitalocean.com/registrations/new)
        or [log in](https://cloud.digitalocean.com/login)
    - Get a write-enabled [access token](https://cloud.digitalocean.com/settings/tokens/new)
    - Add [your SSH key](https://www.digitalocean.com/community/tutorials/how-to-use-ssh-keys-with-digitalocean-droplets) and
        retrieve the ID with `curl -X GET "https://api.digitalocean.com/v2/account/keys" -H "Authorization: Bearer $ACCESS_TOKEN"`
2. Access or create a Mailgun Account
    - [Sign up](https://mailgun.com/signup) or [log in](https://mailgun.com/sessions/new)
    - Get your [API token](https://mailgun.com/cp) (see 'API Key')
3. Select your domain (`example.com`) and [point the nameservers
    at DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-host-name-with-digitalocean#step-two—change-your-domain-server).

## Getting the Configuration

Terraform is configured by `.tf` files. By default, Terraform collects
all `*.tf` files in a directory and merges them together.

You'll need to clone the following [example repository](https://github.com/pearkes/discourse-terraform) with Git:

<pre class="prettyprint">
$ git clone https://github.com/pearkes/discourse-terraform.git
</pre>

Once the repository is retrieved from GitHub, we can try running
Terraform.

## Running the Plan Command

Although not required for a `terraform apply`, `terraform plan` helps
you visualize what Terraform will do. In this case, you should see
output similar to the following:

    $ terraform plan \
        -var 'developer_email=YOUR_ACCESS_KEY' \
        -var 'smtp_password=YOUR_SECRET_KEY' \
        -var 'domain=YOUR_DOMAIN' \
        -var 'ssh_key_id=YOUR_SSH_KEY_ID' \
        -var 'do_token=YOUR_DO_TOKEN' \
        -var 'mailgun_key=YOUR_MAILGUN_KEY' \
        -var 'ssh_key_path=YOUR_KEY_PATH'
    ...

    + digitalocean_domain.discourse
        ip_address: "" => "${digitalocean_droplet.discourse.ipv4_address}"
        name:       "" => "YOUR_DOMAIN"

    + digitalocean_droplet.discourse
        backups:              "" => "<computed>"
        image:                "" => "ubuntu-14-04-x64"
        ipv4_address:         "" => "<computed>"
        ipv4_address_private: "" => "<computed>"
        ipv6:                 "" => "<computed>"
        ipv6_address:         "" => "<computed>"
        ipv6_address_private: "" => "<computed>"
        locked:               "" => "<computed>"
        name:                 "" => "discourse"
        private_networking:   "" => "<computed>"
        region:               "" => "nyc2"
        size:                 "" => "2gb"
        ssh_keys.#:           "" => "1"
        ssh_keys.0:           "" => "YOUR_SSH_KEY_ID"
        status:               "" => "<computed>"

    + mailgun_domain.mail
        name:                "" => "YOUR_DOMAIN"
        receiving_records.#: "" => "<computed>"
        sending_records.#:   "" => "<computed>"
        smtp_login:          "" => "<computed>"
        smtp_password:       "" => "YOUR_SECRET_KEY"
        spam_action:         "" => "disabled"
        wildcard:            "" => "<computed>"

If you're happy with the output, you can move on to apply and create
the resources.

## Running the Apply Command

    $ terraform apply \
        -var 'developer_email=YOUR_ACCESS_KEY' \
        -var 'smtp_password=YOUR_SECRET_KEY' \
        -var 'domain=YOUR_DOMAIN' \
        -var 'ssh_key_id=YOUR_SSH_KEY_ID' \
        -var 'do_token=YOUR_DO_TOKEN' \
        -var 'mailgun_key=YOUR_MAILGUN_KEY' \
        -var 'ssh_key_path=YOUR_KEY_PATH'
    ...

This will create your infrastructure, showing you the output along
the way. In this example, the following steps occur:

1. The domain is created on Mailgun.
2. The droplet (server) is created, provisioned with SMTP details and
other configurations.
3. The DNS records are created for mail and the application, using the
IP addressed assigned to the previously created droplet.

The whole process takes some time, depending on several factors, as
the provisioner on the server is installing, configuring and restarting
Discourse. Under the hood, this uses Docker, which Terraform
happily provisions on top of the DigitalOcean droplet.

Additionally, DigitalOcean DNS may take some time to propagate.

If you're interested in seeing detailed logs of what Terraform
is doing, run the command with `TF_LOG=1 ...` prepended.

## Conclusion

Setting up Discourse with Terraform is an interesting example of what
kind of automation is possible.

Part of the value of Terraform is how it combines resources, as
demonstrated with Mailgun, and the resulting provisioning of SMTP
credentials for the application to read.

If you're interested in learning more about Terraform, follow the links
below.

- [Getting started with Terraform](http://www.terraform.io/intro/getting-started/install.html)
- [Terraform vs. other software](http://www.terraform.io/intro/vs/index.html)
- [Supported Terraform Providers](http://www.terraform.io/docs/providers/index.html)
- [Terraform Internals](http://www.terraform.io/docs/internals/index.html)
