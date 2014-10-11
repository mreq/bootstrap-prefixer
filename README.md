bootstrap-prefixer
==================

Node tool for prefixing bootstrap's less files.

Usage
-----

```
bootstrap-prefixer [prefix] [path to bootstrap/less]
```

For instance `bootstrap-prefixer tb- stylesheets/bootstrap/less` would prefix all the classes and mixins with `tb-`. That means `.btn` would become `.tb-btn` etc.

**The path to bootstrap/less expects to [point to this sort of directory](https://github.com/twbs/bootstrap/tree/master/less)**.
