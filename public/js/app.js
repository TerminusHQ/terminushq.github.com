(function() {
  if (!this.require) {
    var modules = {}, cache = {};

    var require = function(name, root) {
      var path = expand(root, name), indexPath = expand(path, './index'), module, fn;
      module   = cache[path] || cache[indexPath];
      if (module) {
        return module;
      } else if (fn = modules[path] || modules[path = indexPath]) {
        module = {id: path, exports: {}};
        cache[path] = module.exports;
        fn(module.exports, function(name) {
          return require(name, dirname(path));
        }, module);
        return cache[path] = module.exports;
      } else {
        throw 'module ' + name + ' not found';
      }
    };

    var expand = function(root, name) {
      var results = [], parts, part;
      // If path is relative
      if (/^\.\.?(\/|$)/.test(name)) {
        parts = [root, name].join('/').split('/');
      } else {
        parts = name.split('/');
      }
      for (var i = 0, length = parts.length; i < length; i++) {
        part = parts[i];
        if (part == '..') {
          results.pop();
        } else if (part != '.' && part != '') {
          results.push(part);
        }
      }
      return results.join('/');
    };

    var dirname = function(path) {
      return path.split('/').slice(0, -1).join('/');
    };

    this.require = function(name) {
      return require(name, '');
    };

    this.require.define = function(bundle) {
      for (var key in bundle) {
        modules[key] = bundle[key];
      }
    };

    this.require.modules = modules;
    this.require.cache   = cache;
  }

  return this.require;
}).call(this);this.require.define({"app":function(exports, require, module){(function() {
  $(function() {
    if (console && console.log) {
      console.log("%cWelcome%chttp://terminus.io/etc/jd", "line-height: 30px; border-radius: 5px 0 0 5px; background-color: #666; color: white; padding: 6px;", "border-radius: 0 5px 5px 0; border: 1px solid #666; color: #666; padding: 5px;");
    }
    return $("a[data-scroll]").click(function(evt) {
      var $target;
      evt.preventDefault();
      $target = $($(this).attr("href"));
      if ($target.length > 0) {
        return $("body").animate({
          scrollTop: $target.offset().top
        }, 400);
      }
    });
  });

}).call(this);
;}});
this.require.define({"github":function(exports, require, module){(function() {
  var defaultSettings, defaultUser, embedCommits, embedUser;

  defaultSettings = {
    repo: "anson0370/anson0370.github.com",
    limit: 5,
    title: "Blog commits"
  };

  defaultUser = "anson0370";

  embedCommits = function($selector) {
    return $selector.each(function() {
      var $target, settings;
      $target = $(this);
      settings = $.extend(defaultSettings, {
        repo: $target.data("repo"),
        limit: $target.data("limit"),
        title: $target.data("title")
      });
      return $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/" + settings.repo + "/commits?per_page=" + settings.limit,
        success: function(data) {
          var html;
          html = "<div class=\"github-commits\"><h3>" + settings.title + "</h3><ol>";
          $.each(data, function() {
            return html += "<li>\n  <img class=\"commit-author\" src=\"" + this.author.avatar_url + "\" alt=\"avatar\">\n  <p class=\"commit-log\">" + this.commit.message + " <span class=\"commit-time\">- " + (new Date(this.commit.committer.date).toLocaleDateString("en-US")) + "</span></p>\n  <span class=\"commit-sha\"><a href=\"" + this.html_url + "\" target=\"_blank\">" + this.sha.slice(0, 10) + "&nbsp;<i class=\"icon-chevron-sign-right\"></i></a></span>\n</li>";
          });
          html += "</ol></div>";
          return $target.html(html);
        }
      });
    });
  };

  embedUser = function($selector) {
    return $selector.each(function() {
      var $target, user;
      $target = $(this);
      user = $target.data("user") || defaultUser;
      return $.ajax({
        type: "GET",
        url: "https://api.github.com/users/" + user,
        success: function(data) {
          var html;
          html = "<div class=\"github-user\">\n  <div class=\"user-name\">Name: " + data.name + "</div>\n  <div class=\"user-location\">Location: " + data.location + "</div>\n  <ul class=\"user-infos\">\n    <li class=\"user-repos\">Repos: " + data.public_repos + "</li>\n    <li class=\"user-gists\">Gists: " + data.public_gists + "</li>\n    <li class=\"user-followers\">Followers: " + data.followers + "</li>\n  </ul>\n</div>";
          return $target.html(html);
        }
      });
    });
  };

  module.exports = {
    embedCommits: embedCommits,
    embedUser: embedUser
  };

}).call(this);
;}});
