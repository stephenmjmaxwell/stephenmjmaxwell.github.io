---
layout: post
title: Validating SSL in Alpine
feature-img: "img/2014-09-18-alpine-header.png"
---

[Alpine](http://www.washington.edu/alpine/) is a terminal email client that I use with FastMail's email service. 
I hope this blog post will help people who use both and don't validate their SSL.

![Alpine](/img/2014-09-18-alpine.png)
*Tiling window manager with Alpine*

Looking at `.pinerc` files on github and other places online for FastMail users you will see the following:

{% highlight bash %}
	user-domain=mail.messagingengine.com
	inbox-path={mail.messagingengine.com/user=
	email@fastmail.fm/ssl/novalidate-cert}INBOX
	folder-collections={mail.messagingengine.com/
	user=email@fastmail.fm/ssl/novalidate-cert}INBOX.[]
{% endhighlight %}  


### The interesting part

In the above configuration you can see a `novalidate-cert` after ssl. With this configuration a 
connection is made to FastMail's server via SSL but the certificate is not validated; it provides 
encryption but not authentication. Your connection will be encrypted, so no plain text for coffee 
shop packet sniffers, but you can't be sure it is FastMail's server you are connecting to. This 
exposes you to a [MiTM](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) (man-in-the-middle) 
attack.

What you would would like to see is:

{% highlight bash %}
	user-domain=mail.messagingengine.com
	inbox-path={mail.messagingengine.com
	/user=email@fastmail.fm/ssl}INBOX
	folder-collections={mail.messagingengine.com
	/user=email@fastmail.fm/ssl}INBOX.[]
{% endhighlight %}  


### _Accio_ certificate

If you try to use the above configuration without taking some additional steps you will get an error. 
I imagine this is why `novalidate-cert` is so common. To make this work we need to grab 
of copy of FastMail's SSL certificate to store locally. We can use OpenSSL to accomplish this.

{% highlight bash %}
	openssl s_client -connect www.fastmail.fm:443
{% endhighlight %}  

This will output a lot of certificate related information, most of which we don't need. 
The part which begins `-----BEGIN CERTIFICATE-----` and ends with `-----END CERTIFICATE-----` 
is what we need to copy. Copy this to a `.pem` file such as mail.fastmail.fm.pem. This is only 
a temporary name. We will need to find out the hash value of this certificate as this is what 
the file will be renamed to. Hash values are used for naming so that matching certificates can 
easily be found on your system. We can use OpenSSL to find our hash value.

{% highlight bash %}
	openssl x509 -in mail.fastmail.fm.pem -hash -noout
{% endhighlight %}  



This will return an 8 character hash value such as e656db79. This is what we will name our .pem 
file but with one alteration. We will add a suffix; a number indicating whether or not we have 
more than one copy of this certificate. It is likely this will be the first copy so in this case 
we will append a 0 to the name forming e656db79.0.

### FileUtils.mv('*.pem', '/usr/lib/ssl')

Now that we have our certificate, with it's correct name, we just need to know where to put it. 
To find out where OpenSSL keeps the certs folder on your system use the following:

{% highlight bash %}
	openssl version -d
{% endhighlight %}  

On Debian certificates are stored in `/usr/lib/ssl`. Once you have moved the certificate to your 
SSL certs directory and start alpine you should be greeted with a login dialog.



