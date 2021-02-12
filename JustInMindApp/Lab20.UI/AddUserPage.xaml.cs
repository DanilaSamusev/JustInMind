using JustInMindApp;
using JustInMindApp.Models;

using System.Windows;
using System.Windows.Controls;

namespace Lab20.UI
{
    /// <summary>
    /// Interaction logic for AddUserPage.xaml
    /// </summary>
    public partial class AddUserPage : Page
    {
        JustInMindContext justInMindContext = new JustInMindContext();

        public AddUserPage()
        {
            InitializeComponent();
            Name.Text = "User name";
            Password.Password = "***"; 
            RoleId.Text = "Role id";
        }

        private void Login_Click(object sender, RoutedEventArgs e)
        {
            User user = new User() 
            {
                UserName = Name.Text,
                Password = this.Password.Password,
                RoleId = int.Parse(RoleId.Text)
            };

            user = justInMindContext.Users.Add(user).Entity;
            justInMindContext.SaveChanges();
        }

        
    }
}
