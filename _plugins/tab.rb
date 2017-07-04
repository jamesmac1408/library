module Jekyll
    class Tab < Liquid::Block
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


            output = "<button class=\"tab-link\"><span class=\"tab-text\">#{safeContent}</span></button>"

            output
        end
    end
end

Liquid::Template.register_tag('tab', Jekyll::Tab)