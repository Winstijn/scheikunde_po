require 'sinatra'
require 'sinatra/contrib'
require "sinatra/reloader" if development?
require "net/http"
require "uri"
require "json"

# Making this an API for the app and the rest of the world.
before do
   headers 'Access-Control-Allow-Origin' => '*',
           'Access-Control-Allow-Methods' => ['OPTIONS', 'GET', 'POST']
end

# Version 1.0 has been deprecated because the scraper doesn't work with the current RoosterTV
get '/:route' do
  uri = URI.parse("http://661203.websites.xs4all.nl/roostertv/lln/" + params['route'])
  return ((Net::HTTP.new(uri.host, uri.port)).get(uri.request_uri)).body
end

get '/feeds/content/site/t' do
  return Net::HTTP.get(URI.parse('https://sites.google.com/pixelhobby.com/platewatch/homepage'))
end

get '/' do
   send_file './public/baseparen.html'
end

set :public_folder, './public'
