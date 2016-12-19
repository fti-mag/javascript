#!/usr/bin/ruby

Encoding.default_external = Encoding::UTF_8

require "cgi"
require 'json'


cgi = CGI.new

print cgi.header

def countsubdirs(path)
	Dir.entries(path).select{ |fname| File.directory?(path + '/' + fname) }.length() - 2 rescue 0
end

def subdirs(path)
	content = Dir.entries(path).select{ |fname| File.directory?(path + '/' + fname) } rescue []
	content.select{ |fname| fname != '.' and fname != '..' }.sort()
end

# sleep(0.5)

path = cgi['path']
$stderr.print (path + "\n")

objs = subdirs(path).map{ |fname|
	fpath = path + '/' + fname
	size = countsubdirs(fpath)
	'{"name": ' + fname.to_json() + ', "size": "' + size.to_s() + '"}'
}

print '{"content": [' + objs.inject(''){ |sum, fn| if sum.length() > 0 then sum + ', ' + fn else fn end } + ']}'
