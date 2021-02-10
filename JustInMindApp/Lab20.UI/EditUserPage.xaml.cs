using JustInMindApp;
using JustInMindApp.Models;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

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
