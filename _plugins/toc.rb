module Jekyll
  module TocFilter
    def toc(input)
      output = "<ol class=\"toc\">"
      input.scan(/<ul id="markdown-toc">(.*)<\/ul>/mi).each do |entry|
        output += entry[0]
      end
      output += '</ol>'
      output
    end
  end
end
Liquid::Template.register_filter(Jekyll::TocFilter)