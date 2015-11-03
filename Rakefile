task :build do
  system "jekyll build"
end

task :release do
  Rake::Task['build'].execute
  system "rsync -rv --progress --delete _site/ admin@121.40.53.36:~/terminus.io"
end
