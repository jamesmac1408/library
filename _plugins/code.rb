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

            output = "<div class=\"demo-code\">{% highlight #{lang} %}"
            output += "#{safeContent}{% endhighlight %}</div>"

            output
        end
    end
end

Liquid::Template.register_tag('code', Jekyll::CodeTag)