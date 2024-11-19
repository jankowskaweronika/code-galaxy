import { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import AboutUsPage from './AboutUsPage';
import { ThemeProvider } from '@mui/material';
import theme from '../../theme/theme';

const meta: Meta<typeof AboutUsPage> = {
    title: 'Pages/AboutUsPage',
    component: AboutUsPage,
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <MemoryRouter>
                <ThemeProvider theme={theme}>
                    <Story />
                </ThemeProvider>
            </MemoryRouter>
        ),
    ],
    parameters: {
        layout: 'fullscreen',
    },
};

export default meta;

type Story = StoryObj<typeof AboutUsPage>;

const defaultTeam = [
    {
        photo: "https://thispersondoesnotexist.com/",
        name: 'Anna Kowalska',
        role: 'Główny Trener',
        bio: 'Ponad 10 lat doświadczenia w nauczaniu i rozwoju umiejętności zawodowych.'
    },
    {
        photo: "https://thispersondoesnotexist.com/",
        name: 'Piotr Nowak',
        role: 'Ekspert Techniczny',
        bio: 'Specjalista z wieloletnim doświadczeniem w branży IT i szkoleniach.'
    }
];

export const Default: Story = {
    args: {
        title: 'CodeRoad',
        description: 'Nasza akademia szkoleń to miejsce, gdzie pasja spotyka profesjonalizm. Tworzymy wysokiej jakości kursy, które pomagają rozwijać umiejętności i osiągać wyznaczone cele zawodowe.',
        values: ['Jakość merytoryczna', 'Indywidualne podejście', 'Praktyczne umiejętności', 'Ciągły rozwój'],
        teamTitle: 'Nasz Zespół',
    },
};

export const CustomTitle: Story = {
    args: {
        ...Default.args,
        title: 'Akademia CodeRoad',
    },
};

export const CustomDescription: Story = {
    args: {
        ...Default.args,
        description: 'Jesteśmy zespołem pasjonatów, którzy kochają dzielić się wiedzą i doświadczeniem w programowaniu.',
    },
};

export const CustomValues: Story = {
    args: {
        ...Default.args,
        values: ['Innowacyjność', 'Kreatywność', 'Współpraca', 'Rozwój'],
    },
};

export const ExtendedTeam: Story = {
    args: {
        ...Default.args,
        team: [
            ...defaultTeam,
            {
                photo: "https://thispersondoesnotexist.com/",
                name: 'Maria Wiśniewska',
                role: 'Mentor Frontend',
                bio: 'Ekspertka React i TypeScript z 5-letnim doświadczeniem w nauczaniu.'
            },
        ],
    },
};
