using CookingApp.Infrastructure.Pagination;
using FluentAssertions;

namespace CookingApp.UnitTests.InfrastructureTests.Pagination
{
    public class PagedListTests
    {
        [Theory]
        [InlineData(0, 5, 1, 3, 3)]  // Edge case: zero index page
        [InlineData(1, 10, 2, 15, 15)]  // Normal case
        public void PagedList_ShouldInitializeCorrectly(int pageIndex, int pageSize, long totalPages, long totalCount, int itemCount)
        {
            // Arrange
            var items = Enumerable.Range(1, itemCount).Select(x => x.ToString()).ToList();

            // Act
            var pagedList = new PagedList<string>(items, pageIndex, pageSize, totalPages, totalCount);

            // Assert
            pagedList.PageIndex.Should().Be(pageIndex);
            pagedList.PageSize.Should().Be(pageSize);
            pagedList.TotalPages.Should().Be(totalPages);
            pagedList.TotalCount.Should().Be(totalCount);
            pagedList.Items.Should().BeEquivalentTo(items, "because the items should be stored exactly as provided");
        }

        [Fact]
        public void HasPreviousPage_ShouldBeTrue_WhenPageIndexGreaterThanOne()
        {
            // Arrange
            var items = new List<string> { "Item1", "Item2" };
            var pagedList = new PagedList<string>(items, 2, 1, 3, 3);

            // Act & Assert
            pagedList.HasPreviousPage.Should().BeTrue();
        }

        [Fact]
        public void HasPreviousPage_ShouldBeFalse_WhenPageIndexIsOne()
        {
            // Arrange
            var items = new List<string> { "Item1", "Item2" };
            var pagedList = new PagedList<string>(items, 1, 1, 3, 3);

            // Act & Assert
            pagedList.HasPreviousPage.Should().BeFalse();
        }

        [Fact]
        public void HasNextPage_ShouldBeTrue_WhenPageIndexLessThanTotalPages()
        {
            // Arrange
            var items = new List<string> { "Item1", "Item2" };
            var pagedList = new PagedList<string>(items, 1, 2, 3, 6);

            // Act & Assert
            pagedList.HasNextPage.Should().BeTrue();
        }

        [Fact]
        public void HasNextPage_ShouldBeFalse_WhenPageIndexEqualsTotalPages()
        {
            // Arrange
            var items = new List<string> { "Item1", "Item2" };
            var pagedList = new PagedList<string>(items, 3, 2, 3, 6);

            // Act & Assert
            pagedList.HasNextPage.Should().BeFalse();
        }
    }
}
