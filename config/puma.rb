if (/darwin/ =~ RUBY_PLATFORM) == nil
# bind "unix:///var/run/sockets/alkwin_scheikunde.sock"
 port 3000
else
 port ENV.fetch("PORT") { 3000 }
end

environment "production"
pidfile 'tmp/pids/server.pid'