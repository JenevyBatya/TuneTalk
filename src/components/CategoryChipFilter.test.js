import { render, screen, fireEvent } from "@testing-library/react";
import CategoryChipFilter from "./CategoryChipFilter";
import "@testing-library/jest-dom";

describe("CategoryChipFilter component", () => {
    const mockSetSelectedCategories = jest.fn();

    const renderComponent = (selectedCategories = []) =>
        render(
            <CategoryChipFilter
                selectedCategories={selectedCategories}
                setSelectedCategories={mockSetSelectedCategories}
            />
        );

    test("renders initial categories", () => {
        renderComponent();
        const categories = ["Криминал", "Секс", "Дизайн", "Образование", "Драма", "Воспитание"];
        categories.forEach((category) => {
            expect(screen.getByText(category)).toBeInTheDocument();
        });
        expect(screen.getByText("...")).toBeInTheDocument();
    });


    test("handles category deselection", () => {
        renderComponent(["Криминал"]);
        const category = screen.getByText("Криминал");

        fireEvent.click(category);

        expect(mockSetSelectedCategories).toHaveBeenCalledWith(expect.not.arrayContaining(["Криминал"]));
    });

    test("toggles 'show all categories' button", () => {
        renderComponent();
        const toggleButton = screen.getByText("...");

        fireEvent.click(toggleButton);

        expect(screen.getByText("Наука")).toBeInTheDocument();
        expect(screen.getByText("История")).toBeInTheDocument();

        fireEvent.click(toggleButton);

        expect(screen.queryByText("Наука")).not.toBeInTheDocument();
    });

    test("renders selected categories with check icon", () => {
        renderComponent(["Криминал"]);
        const category = screen.getByText("Криминал");

        expect(category).toContainHTML("<svg"); // Проверяет наличие иконки CheckIcon
    });
});
