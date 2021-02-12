using JustInMindApp;
using JustInMindApp.Models;

using System.Linq;
using System.Windows;
using System.Windows.Controls;

namespace Lab20.UI
{
    /// <summary>
    /// Interaction logic for EditUserPage.xaml
    /// </summary>
    public partial class EditUserPage : Page
    {
        JustInMindContext justInMindContext = new JustInMindContext();

        public EditUserPage()
        {
            InitializeComponent();
            Name.Text = "User name";
            Password.Password = "***";
            UserId.Text = "Id";
            RoleId.Text = "Role id";
        }

        private void Edit_Click(object sender, RoutedEventArgs e)
        {
            User user = justInMindContext.Users.FirstOrDefault(u => u.Id == int.Parse(UserId.Text));

            user.UserName = Name.Text;
            user.Password = Password.Password;
            user.RoleId = int.Parse(RoleId.Text);

            justInMindContext.SaveChanges();
        }
    }
}
