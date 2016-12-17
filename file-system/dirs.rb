#!/usr/bin/ruby

Encoding.default_external = Encoding::UTF_8

require "cgi"
require 'json'


cgi = CGI.new

print cgi.header

def subdirs(path)
	content = Dir.entries(path).select{ |fname| fname != '.' and fname != '..' } rescue []
	content.select{ |fname| File.directory?(path + '/' + fname) }.sort()
end

# sleep(0.5)

path = cgi['path']
$stderr.print (path + "\n")

objs = subdirs(path).map{ |fname|
	fpath = path + '/' + fname
	size = subdirs(fpath).length()
	'{"name": ' + fname.to_json() + ', "size": "' + size.to_s() + '"}'
}

print '{"content": [' + objs.inject(''){ |sum, fn| if sum.length() > 0 then sum + ', ' + fn else fn end } + ']}'
