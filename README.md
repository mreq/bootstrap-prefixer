bootstrap-prefixer
==================

Node tool to prefix twitter bootstrap's css files.

Usage
-----

```
bootstrap-prefixer [prefix] [path to bootstrap/less]
```

For instance `bootstrap-prefixer tb- stylesheets/bootstrap/less` would prefix all the classes and mixins with `tb-`. That means `.btn` would become `.tb-btn` etc.