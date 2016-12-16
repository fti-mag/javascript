#!/usr/bin/ruby

require "cgi"

cgi = CGI.new

print cgi.header

path = cgi['path']

fns = Dir.entries(path).select{ |fn| fn != '.' and fn != '..' }.sort()
objs = fns.map{ |fn| '{"type": "' + if File.directory?(path + '/' + fn) then 'dir' else 'file' end + '", "name": "' + fn + '"}'}

print '{"content": [' + objs.inject(''){ |sum, fn| if sum.length() > 0 then sum + ', ' + fn else fn end } + ']}'
