module Jekyll
    class Tabs < Liquid::Block
        def initialize(tag_name, markup, tokens)
            @markup = markup
            super
        end

        def render(context)
            contents = super

            content = Liquid::Template.parse(contents).render context

            safeContent = content

            output = "<div class=\"tabs-container\">"
            output += "<div class=\"tabs-wrapper\">"
            output += "#{safeContent}"
            output += "</div></div>"

            output
        end
    end
end

Liquid::Template.register_tag('tabs', Jekyll::Tabs)