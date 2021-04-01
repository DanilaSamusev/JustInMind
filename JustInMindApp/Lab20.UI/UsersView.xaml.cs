using JustInMindApp;

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
    /// Логика взаимодействия для UsersView.xaml
    /// </summary>
    public partial class UsersView : Page
    {
        public UsersView()
        {
            InitializeComponent();

            var context = new JustInMindContext();

            var usersList = context.Users.ToList();

            var text = "";

            for (var i = 0; i < usersList.Count; i++)
            {
                text += $"Id: {usersList[i].Id}, Name {usersList[i].UserName},  RoleId: {usersList[i].RoleId}\n";
            }

            users.Text = text;
        }
    }
}
