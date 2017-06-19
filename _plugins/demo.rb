module Jekyll
    class DemoTag < Liquid::Block
        def initialize(tag_name, markup, tokens)
            @markup = markup
            super
        end

        def render(context)
            contents = super

            content = Liquid::Template.parse(contents).render context

            safeContent = content

            output = "<div class=\"demo-container\">"
            output += "#{safeContent}"
            output += "</div>"

            output
        end
    end
end

Liquid::Template.register_tag('demo', Jekyll::DemoTag)