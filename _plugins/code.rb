module Jekyll
    class CodeTag < Liquid::Block
        def initialize(tag_name, markup, tokens)
            @markup = markup

            super
        end


        def render(context)
            contents = super

            content = Liquid::Template.parse(contents).render context

            safeContent = content

            lang = @markup
            if (@markup.length == 0)
                lang = "html"
            end

            output = "<div class=\"demo-code\">"
            output += "<button class=\"demo-code--copy\">"
            output += "<svg fill=\"#000000\" height=\"20\" viewBox=\"0 0 24 24\" width=\"20\" xmlns=\"http://www.w3.org/2000/svg\"> <path d=\"M0 0h24v24H0z\" fill=\"none\"/> <path d=\"M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z\"/></svg>"
            output += "</button>"
            output += "{% highlight #{lang} %}"
            output += "#{safeContent}{% endhighlight %}"
            output += "</div>"

            output
        end
    end
end

Liquid::Template.register_tag('code', Jekyll::CodeTag)