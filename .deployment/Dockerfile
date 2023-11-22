# Ruby 2.5.0
FROM ruby:2.5.0-alpine

WORKDIR /app/

COPY Gemfile Gemfile.lock ./

# Install all dependencies (bundler 1.16.4)
RUN gem install bundler -v 1.16.4 --no-ri --no-rdoc

# Install build dependencies for native gems
RUN apk --update add build-base

RUN bundle install --jobs 20 --retry 5

# Copy over the rest.
COPY . .

EXPOSE 3000

# Run the app.
ENTRYPOINT [ "puma", "-C", "config/puma.rb" ]