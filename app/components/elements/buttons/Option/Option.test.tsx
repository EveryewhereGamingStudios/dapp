import { render, screen } from "@testing-library/react";
import Option from './Option'

describe('Option', () => {
    it('renders the component', () => {
        const textToFind = "MagicLink"

        render(<Option
            disabled={false}
            key={"magiclink"}
            logoPath='/assets/wallets/magiclink.svg'
            name={"MagicLink"}
        />);
        const heading = screen.getByText(textToFind);

        expect(heading).toBeInTheDocument();
    })
})