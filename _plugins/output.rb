module Jekyll
    class OutputTag < Liquid::Block
        def initialize(tag_name, markup, tokens)
            @markup = markup
            super
        end

        def render(context)
            contents = super

            content = Liquid::Template.parse(contents).render context

            safeContent = content

            output = "<div class=\"demo-output\">"
            output += "#{safeContent}"
            output += "</div>"

            output
        end
    end
end

Liquid::Template.register_tag('output', Jekyll::OutputTag)