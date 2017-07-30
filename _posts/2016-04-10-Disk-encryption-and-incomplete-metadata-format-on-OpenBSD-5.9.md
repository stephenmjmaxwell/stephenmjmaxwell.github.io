---
layout: post
title: Disk encryption and incomplete metadata format on OpenBSD 5.9

---
This is a brief run down of a user error during full disk encryption on [OpenBSD](https://en.wikipedia.org/wiki/OpenBSD) that 
causes the return of `softraid0: Invalid metadata format`.

As the manual illustrates encryption is handled by [softraid](http://man.openbsd.org/softraid) and [bioctl](http://man.openbsd.org/OpenBSD-6.0/bioctl.8) and should be performed at boot install. 
Entering the shell and typing the following is required to setup full disk encryption:

{% highlight bash %}
    # fdisk -iy sd0
    Writing MBR at offset 0.

    # disklabel -E sd0
    Label editor (enter '?' for help at any prompt)
    > a a
    offset: [2104515]
    size: [39825135] *
    FS type: [4.2BSD] RAID
    > w
    > q
    No label changes.
{% endhighlight %}  

At this point I kept getting my error because I didn’t type **RAID** at `FS type`. Instead I typed enter which normally selects the default configuration in the OpenBSD installer.  
So when I proceeded to use the standard `bioctl` command:  

{% highlight bash %}
    # bioctl -cC -l sd0a softraid0
{% endhighlight %}  

I was getting a `softraid` error about an incorrect metadata format.

{% highlight bash %}
    softraid0: Invalid metadata format
{% endhighlight %}  

Once this was fixed I could move on to the next steps. You need to choose a custom layout for the disk and then do the following with disklabel making sure you have selected the correct mount point.

{% highlight bash %}
    > a a
    offset: [64]
    size: [6265286] *
    FS type: [4.2BSD]
    mount point: [none] /
    Rounding size to bsize (32 sectors): 6265280
    > w
    > q
{% endhighlight %}

Now you should be asked for a password to secure your encrypted drive. [Make sure you pick a strong one.](https://www.xkcd.com/936/)  

---

> The world doesn't live off jam and fancy perfumes - it lives off bread and meat and potatoes. 
> Nothing changes. All the big fancy stuff is sloppy stuff that crashes. I don't need dancing 
> baloney - I need stuff that works. That's not as pretty, and just as hard.   
- Theo de Raadt




